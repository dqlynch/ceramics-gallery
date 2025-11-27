import { type FormEvent, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';

type AssignmentMap = Record<string, string>;
type PreferenceMap = Record<string, string[]>;

const PageContainer = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 6px;
  font-size: 1rem;
  background: ${props => props.theme.colors.background};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const ResultCard = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  border-radius: 8px;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.secondary};
`;

const ResultTitle = styled.h2`
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  font-size: 1.4rem;
  color: ${props => props.theme.colors.primary};
`;

const PreferenceTitle = styled.h3`
  margin: ${props => props.theme.spacing.md} 0 ${props => props.theme.spacing.sm} 0;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.secondary};
`;

const PreferenceList = styled.ul`
  margin: 0;
  padding-left: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.secondary};
  line-height: 1.5;
`;

const PreferenceItem = styled.li`
  list-style: disc;
`;

const ErrorMessage = styled.p`
  color: #c53f3f;
  margin: 0;
`;

const formatName = (value: string) =>
  value.replace(/\b\w/g, char => char.toUpperCase());

const SecretSanta = () => {
  const [assignments, setAssignments] = useState<AssignmentMap>({});
  const [preferences, setPreferences] = useState<PreferenceMap>({});
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAssignments = async () => {
      try {
        const [assignmentsResponse, preferencesResponse] = await Promise.all([
          fetch('/secret-santa/1.txt', { cache: 'no-store' }),
          fetch('/secret-santa/preferences.txt', { cache: 'no-store' }),
        ]);

        if (!assignmentsResponse.ok) {
          throw new Error('Failed to fetch assignments');
        }

        const assignmentsText = await assignmentsResponse.text();
        const preferencesText = preferencesResponse.ok ? await preferencesResponse.text() : '';

        const map = assignmentsText
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean)
          .reduce<AssignmentMap>((acc, line) => {
            const [giver, ...rest] = line.split(/\s+/);
            const recipientName = rest.join(' ');
            if (giver && recipientName) {
              acc[giver.toLowerCase()] = recipientName;
            }
            return acc;
          }, {});

        const preferenceMap = preferencesText
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean)
          .reduce<PreferenceMap>((acc, line) => {
            const [namePart, ...preferencesParts] = line.split(',');
            if (!namePart) {
              return acc;
            }
            const items = preferencesParts.map(item => item.trim()).filter(Boolean);
            if (items.length > 0) {
              acc[namePart.trim().toLowerCase()] = items;
            }
            return acc;
          }, {});

        if (isMounted) {
          setAssignments(map);
          setPreferences(preferenceMap);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load the Secret Santa list right now. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAssignments();

    return () => {
      isMounted = false;
    };
  }, []);

  const knownParticipants = useMemo(() => Object.keys(assignments).length, [assignments]);

  const participantOptions = useMemo(
    () =>
      Object.keys(assignments)
        .sort()
        .map(key => ({
          value: key,
          label: formatName(key),
        })),
    [assignments]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const normalized = name.trim().toLowerCase();

    if (!normalized) {
      setError('Choose your name from the list to continue.');
      setRecipient(null);
      return;
    }

    if (!assignments[normalized]) {
      setError("We couldn't find your name. Double-check the spelling.");
      setRecipient(null);
      return;
    }

    setRecipient(assignments[normalized]);
    setError(null);
  };

  return (
    <PageContainer>
      <Title>Secret Santa 2025</Title>
      <Description>Select your name to reveal who you&apos;ll be gifting to.</Description>

      <Form onSubmit={handleSubmit}>
        <Select
          aria-label="Select your name"
          value={name}
          onChange={event => setName(event.target.value)}
          disabled={isLoading || participantOptions.length === 0}
        >
          <option value="" disabled>
            Choose your name
          </option>
          {participantOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Button type="submit" disabled={isLoading || knownParticipants === 0}>
          Reveal my person
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>

      {!isLoading && recipient && (
        <ResultCard>
          <ResultTitle>You&apos;re gifting to</ResultTitle>
          <p>{formatName(recipient)}</p>
          {preferences[recipient.toLowerCase()] && (
            <>
              <PreferenceTitle>Gift hints</PreferenceTitle>
              <PreferenceList>
                {preferences[recipient.toLowerCase()].map(item => (
                  <PreferenceItem key={item}>{item}</PreferenceItem>
                ))}
              </PreferenceList>
            </>
          )}
        </ResultCard>
      )}
    </PageContainer>
  );
};

export default SecretSanta;

