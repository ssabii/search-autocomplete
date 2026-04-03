interface RecentQueryListProps {
  recentQueries?: string[];
}

function RecentQueryList({ recentQueries }: RecentQueryListProps) {
  if (!recentQueries || recentQueries.length === 0) {
    return null;
  }

  return (
    <ul>
      {recentQueries?.map((query) => (
        <li key={query}>{query}</li>
      ))}
    </ul>
  );
}

export default RecentQueryList;
