import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_POKEMON_API_URL ||
      "https://graphql-pokemon2.vercel.app/",
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon: {
            read(existing) {
              return existing;
            },
          },
        },
      },
    },
  }),
  // ปิดระบบ SSR สำหรับอินสแตนซ์หน้าบ้าน เพื่อป้องกันปัญหา Hydration Mismatch
  ssrMode: typeof window === "undefined",
});
