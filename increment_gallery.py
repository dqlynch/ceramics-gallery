#!/usr/bin/env python3
"""
increment_gallery.py

Rename numeric .jpg files in a gallery by an increment (positive or negative).

Usage:
  python increment_gallery.py START INCREMENT [--dir /absolute/or/relative/path] [--dry-run]

- START: integer; files numbered >= START will be processed (e.g., 12.jpg, 13.jpg)
- INCREMENT: integer; positive to increase numbers, negative to decrease

By default, operates on the repository's public/images/gallery directory.
Use --dry-run to preview renames without making any changes.

Safety:
- Performs collision checks before renaming
- Uses a two-phase rename via temporary filenames to avoid in-place conflicts
"""

from __future__ import annotations

import argparse
import os
import re
import sys
import uuid
from pathlib import Path
from typing import Dict, List, Tuple


NUMERIC_JPG_RE = re.compile(r"^(\d+)\.jpg$")


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Increment or decrement numeric .jpg filenames in the gallery.")
    parser.add_argument("start", type=int, help="Start number (inclusive). Files >= this number will be processed.")
    parser.add_argument(
        "increment",
        type=int,
        help="Amount to add to each filename number (can be negative).",
    )
    default_dir = Path(__file__).resolve().parent / "public" / "images" / "gallery"
    parser.add_argument(
        "--dir",
        dest="directory",
        default=str(default_dir),
        help=f"Target directory containing numeric .jpgs (default: {default_dir})",
    )
    parser.add_argument(
        "--dry-run",
        dest="dry_run",
        action="store_true",
        help="Print the planned renames and exit without changing files.",
    )
    return parser.parse_args()


def find_numeric_jpgs(directory: Path) -> List[Tuple[int, Path]]:
    files: List[Tuple[int, Path]] = []
    for entry in directory.iterdir():
        if not entry.is_file():
            continue
        match = NUMERIC_JPG_RE.match(entry.name)
        if match:
            number = int(match.group(1))
            files.append((number, entry))
    return files


def build_rename_plan(
    files: List[Tuple[int, Path]], start: int, increment: int
) -> Tuple[List[Tuple[Path, Path]], Dict[int, int]]:
    """Return a list of (src_path, dst_path) and a mapping old_num->new_num.

    Only files with number >= start are included.
    """
    plan: List[Tuple[Path, Path]] = []
    mapping: Dict[int, int] = {}
    for number, path in files:
        if number >= start:
            target_number = number + increment
            mapping[number] = target_number
            dst = path.with_name(f"{target_number}.jpg")
            plan.append((path, dst))
    return plan, mapping


def validate_plan(directory: Path, plan: List[Tuple[Path, Path]], mapping: Dict[int, int]) -> None:
    if not plan:
        print("No files to process.")
        sys.exit(0)

    # Ensure target numbers are valid
    for old_num, new_num in mapping.items():
        if new_num < 1:
            print(f"Refusing to rename: target number {new_num} derived from {old_num} is < 1.")
            sys.exit(1)

    # Collect existing filenames for collision detection
    existing_names = {p.name for p in directory.iterdir() if p.is_file()}
    source_names = {src.name for src, _ in plan}
    target_names = {dst.name for _, dst in plan}

    # Check that targets don't collide with files that are not part of the move
    for dst_name in target_names:
        if dst_name in existing_names and dst_name not in source_names:
            print(
                f"Collision detected: target '{dst_name}' already exists and is not being moved. Aborting."
            )
            sys.exit(1)


def two_phase_rename(plan: List[Tuple[Path, Path]]) -> None:
    # Use a unique temporary suffix to avoid clashes across runs
    temp_token = f".__tmp__{os.getpid()}_{uuid.uuid4().hex[:8]}"

    # Map original path to its temp path
    temp_paths: Dict[Path, Path] = {}
    for src, _ in plan:
        temp_path = src.with_name(src.name + temp_token)
        if temp_path.exists():
            raise RuntimeError(f"Temporary path already exists: {temp_path}")
        src.rename(temp_path)
        temp_paths[src] = temp_path

    # Now move temp files to their final destinations
    for src, dst in plan:
        temp_path = temp_paths[src]
        # Ensure destination parent exists
        dst.parent.mkdir(parents=True, exist_ok=True)
        temp_path.rename(dst)


def main() -> None:
    args = parse_arguments()
    directory = Path(args.directory).resolve()

    if not directory.exists() or not directory.is_dir():
        print(f"Directory does not exist or is not a directory: {directory}")
        sys.exit(1)

    files = find_numeric_jpgs(directory)
    if not files:
        print(f"No numeric .jpg files found in {directory}")
        sys.exit(0)

    # Sort by number for cleaner output (order doesn't matter due to two-phase rename)
    files.sort(key=lambda x: x[0])

    plan, mapping = build_rename_plan(files, args.start, args.increment)
    validate_plan(directory, plan, mapping)

    print(f"Directory: {directory}")
    print(f"Processing files with number >= {args.start}")
    print(f"Increment: {args.increment}")
    print("Planned renames:")
    for src, dst in plan:
        print(f"  {src.name} -> {dst.name}")

    if getattr(args, "dry_run", False):
        print("Dry run: no changes made.")
        sys.exit(0)

    try:
        two_phase_rename(plan)
    except Exception as exc:
        print(f"Error during rename: {exc}")
        print("Attempting to abort. Manual cleanup may be required.")
        sys.exit(1)

    print("Done.")


if __name__ == "__main__":
    main()


