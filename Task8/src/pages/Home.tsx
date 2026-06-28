export const Home = () => {
  return (
    <div className="mx-10 my-3">
      <h1>React + TypeScript CRUD Application Assignment</h1>
      <h2>Objective: </h2>
      <p>
        Build a CRUD application using React, TypeScript, and the Fetch API with
        the JSONPlaceholder API.
      </p>
      <h2>Requirements</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Display a list of users.</li>
        <li>Allow users to view posts for a selected user.</li>
        <li>
          Implement the following CRUD operations for posts with appropriate
          form validation:
          <ul className="list-decimal list-inside ml-6 mt-2 space-y-1">
            <li>Create a post</li>
            <li>Edit a post</li>
            <li>Delete a post</li>
          </ul>
        </li>
        <li>Use Optimistic UI Updates for all CRUD operations.</li>
        <li>Implement client-side search and filtering for posts.</li>
        <li>Implement client-side pagination (optional).</li>
        <li>
          Gracefully handle:
          <ul className="list-decimal list-inside ml-6 mt-2 space-y-1">
            <li>Loading states</li>
            <li>Empty states</li>
            <li>Error states</li>
          </ul>
        </li>
        <li>
          Display user-friendly error messages for failed network requests.
        </li>
        <li>Use reusable and well-structured React components.</li>
        <li>Follow TypeScript best practices with proper type definitions.</li>
        <li>
          Configure and use the following development tools:
          <ul className="list-decimal list-inside ml-6 mt-2 space-y-1">
            <li>Husky</li>
            <li>ESLint</li>
            <li>Prettier</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
