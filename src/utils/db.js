/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL (operationsDoc, operationName, variables) {
  const result = await fetch('https://db.rudixlab.com/v1/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName
    })
  })

  return await result.json()
}

function executeInsert_article (operationsDoc) {
  return fetchGraphQL(operationsDoc, 'insert_article', {})
}

export async function insert_counter (operationsDoc) {
  const { errors, data } = await executeInsert_article(operationsDoc)

  if (errors) {
    // handle those errors like a pro
    console.error(errors)
  }

  // do something great with this precious data
  console.log(data)
}
