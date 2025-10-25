// 1. Snapshot - DAO 투표 기록
export async function getSnapshotVotes(address: string) {
  const query = `
    query Votes {
      votes(
        first: 100
        where: { voter: "${address.toLowerCase()}" }
        orderBy: "created"
        orderDirection: desc
      ) {
        id
        voter
        created
        choice
        space {
          id
          name
        }
      }
    }
  `;

  const response = await fetch('https://hub.snapshot.org/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data.data.votes || [];
}

// 2. Tally - 온체인 거버넌스
export async function getTallyProposals(address: string) {
  const response = await fetch(
    `https://api.tally.xyz/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': process.env.TALLY_API_KEY!,
      },
      body: JSON.stringify({
        query: `
          query {
            votes(voter: "${address}") {
              nodes {
                id
                support
                weight
                proposal {
                  id
                  title
                }
              }
            }
          }
        `,
      }),
    }
  );

  const data = await response.json();
  return data.data.votes.nodes || [];
}

// 3. 커뮤니티 점수 계산
export async function calculateCommunityScore(address: string): Promise<number> {
  const [snapshotVotes, tallyVotes] = await Promise.all([
    getSnapshotVotes(address),
    getTallyProposals(address),
  ]);

  let score = 0;

  // Snapshot 투표 (최대 60점)
  const voteCount = snapshotVotes.length;
  if (voteCount >= 20) score += 60;
  else if (voteCount >= 10) score += 40;
  else if (voteCount >= 5) score += 20;

  // Tally 온체인 투표 (최대 40점)
  const onchainVotes = tallyVotes.length;
  if (onchainVotes >= 5) score += 40;
  else if (onchainVotes >= 3) score += 25;
  else if (onchainVotes >= 1) score += 15;

  return Math.min(score, 100);
}
