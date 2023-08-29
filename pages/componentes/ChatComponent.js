'use client'
import React, { useState } from "react";
import { completionsTest } from "./functions";

function ChatComponent() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const context =

  {
    role: "system", content:`
    Sempre se mostre prestativo e seja carinhoso com o cliente.
    Quando o usuário se apresentar ou dizer olá. Dê um breve sobre a loja.
     
    Bem-vindo à Rosália, sua loja online definitiva para encontrar os produtos mais incríveis. Estamos aqui para tornar a sua experiência de compras online mais fácil e prazerosa com a ajuda da nossa assistente virtual, a Rosália.
    
    Sobre a Rosália:
    Na Rosália, estamos comprometidos em oferecer uma ampla variedade de produtos para atender a todas as suas necessidades. Desde eletrônicos a moda, passando por itens de decoração para casa, temos um catálogo diversificado que abrange todas as categorias.
    
    Nossos Produtos:
    - Smartphone Elegante Zephyr: Este smartphone combina design elegante com desempenho poderoso. Perfeito para se manter conectado e atualizado.
    - Conjunto de Jantar Elegância Clássica: Um conjunto de jantar sofisticado para criar momentos memoráveis com a família e amigos.
    - Fones de Ouvido LunaTech: Desfrute de áudio de alta qualidade com estes fones de ouvido confortáveis e modernos.
    - Câmera DSLR Horizon Pro: Capture momentos especiais com clareza e detalhes impressionantes usando nossa câmera DSLR de última geração.
    - Mochila Aventura Explorer: Uma mochila durável e espaçosa, projetada para acompanhar você em todas as suas aventuras.
    
    Como a Rosália Pode Ajudar:
    - A Rosália está aqui para responder a todas as suas perguntas sobre nossos produtos. Quer saber mais detalhes sobre um item específico? Pergunte à Rosália!
    - Procurando por sugestões? Informe à Rosália sobre suas preferências e necessidades, e ela terá prazer em fornecer recomendações personalizadas.
    - Confuso sobre opções de pagamento ou métodos de envio? A Rosália está pronta para esclarecer suas dúvidas.
    
    Como resolver os problemas dos clientes:
    - Pegue o máximo de informações
    - Diga que o sistema criará um ticket automaticamente
    Desenvolvimento e Contato:
    A Rosália foi criada com paixão por Lucas Nunes Mendes. Se você tiver alguma sugestão, feedback ou precisar de suporte técnico, não hesite em entrar em contato conosco. Você pode ligar para nosso número de suporte fictício: (123) 456-7890 ou para o número real de contato do Victor, nosso representante de atendimento: victor@gmail.com.
    
    Nossa missão é tornar sua experiência de compra online tão agradável quanto visitar uma loja física. Explore nosso catálogo, descubra produtos incríveis e deixe a Rosália ser sua guia confiável nessa jornada de compras online. Aproveite sua visita à loja Rosália!
    
    
    
    ` }


  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {

      const userMessage = { content: message, role: "user" };

      setLoading(true);

      try {
        const apiResponse = await completionsTest([context, ...messages, userMessage]);

        const assistantMessage = {
          content: apiResponse.message.content,
          role: "assistant",
        };

        setMessages([...messages, userMessage, assistantMessage]); // Incluindo mensagem do usuário e resposta do assistente
      } catch (error) {
        console.error("Erro ao chamar a API:", error);
      } finally {
        setLoading(false);
      }

      setMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow p-4">
        <div className=" bg-muted flex-grow overflow-y-auto">
          {/* Display messages */}
          <ul className="flex flex-col space-y-2 p-4 overflow-">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`flex p-2 ${msg.role === "user" ? "justify-start" : "justify-end"
                  }`}
              >
                <div
                  className={`rounded-md ${msg.role === "user" ? "text-stone-200 bg-slate-800 w-full p-4 rounded-lg" : " rounded-lg bg-slate-700 w-full p-5 text-white"
                    }`}
                >
                  <span className="p-2">{msg.content}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <textarea
            placeholder="Digite sua mensagem aqui"
            className="rounded-md border bg-muted p-2"
            value={message}
            onChange={handleMessageChange}
          />
          <button
            className={`rounded-md bg-blue-500 text-white p-2 ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={handleSendMessage}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
