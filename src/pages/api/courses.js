export async function GET({ url }) {
  const category = url.searchParams.get("category");

  const data = {
    data: [
      {
        id: "6859021794d3f330fececa0d",
        title: "MERN Stack",
        level: "Beginner",
        description:
          "Full Stack Development Course.\nWhat you can learn?\nAuthentication, ReactJs, TailwindCSS.",
        price: 450,
      },
    ],
    message: "Successful",
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
