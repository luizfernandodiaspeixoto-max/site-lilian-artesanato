const { execSync } = require('child_process');
try {
  const res = execSync('npx netlify-cli claim --site 7468f903-c972-4832-a3d7-f30a5f542152 --token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3OTI4NTIwNzMsImV4cCI6MTc5Mjg1NTY3MywiaXNzIjoiTmV0bGlmeSIsInNlc3Npb25faWQiOiJmODM5OTVlNC0yMDAzLTRjYTMtOTBmYS0yMWYzNzhiM2ZhOTAifQ.GGa20WmzFl1z6c8HQ3DfmRqKrASR7lyGb0sDuhw-2EQ', { encoding: 'utf8' });
  console.log(res);
} catch(e) {
  console.log(e.stdout || e.message);
}
