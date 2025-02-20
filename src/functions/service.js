export async function getService(url) {
  try {
    let response = await fetch(url, {});
    let responseBody = await response.json();
    
    if (response.ok) {
      return { "body": responseBody, "code": response.status };
    } else {
      return { "body": { "error": response.status + " " + (responseBody?.error || "Unknown error") }, "code": response.status };
    }

  } catch (error) {
    return { "body": { "error": "Can not connect to " + url }, "code": 500 };
  }
}
