export async function completionsTest(messages) {

    const apiUrl = "https://api.openai.com/v1/chat/completions";
  
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: messages,
        model: "gpt-3.5-turbo",
        stream: false
      }),
    });
  
    if (!response.ok) {
      throw new Error("Erro ao chamar a API");
    }
  
    const data = await response.json();
    console.log(data.choices[0]);
    return data.choices[0];
  }
  
  
  