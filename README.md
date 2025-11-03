# landing-nail-designer-aquarela

Landing page do curso **Nail Designer Aquarela** (Thayná Placedino) — Vite + React + TypeScript + Tailwind.

## 🚀 Rodando localmente
```bash
pnpm i   # ou npm i / yarn
pnpm dev # ou npm run dev / yarn dev
```

## 🧪 Testes
```bash
pnpm test
```

## 🖼️ Foto da professora
Coloque sua imagem em `public/assets/` com um dos nomes:
- `5DBD4F0C-58BE-4808-8BFA-5881266DAD02.heic`
- `5DBD4F0C-58BE-4808-8BFA-5881266DAD02.jpg`
- `5DBD4F0C-58BE-4808-8BFA-5881266DAD02.jpeg`
- `5DBD4F0C-58BE-4808-8BFA-5881266DAD02.png`

Já deixei um **placeholder .png** com esse nome.

## 🎨 Efeito aquarela
- Fundo animado sutil/visível com gradient cônico e blobs translúcidas.
- Respeita `prefers-reduced-motion`.

## 💳 Checkout
Altere o `href="#checkout"` do botão **Quero me inscrever** no arquivo `src/App.tsx` para o seu link real.

## ▶️ Vídeo
Troque `VIDEO_ID` no `iframe` por seu vídeo do YouTube (ou troque o `src` por Vimeo/MP4).

## ☁️ Deploy na Vercel
1. Faça login em https://vercel.com e clique em **Add New → Project**.
2. Importe seu repositório (GitHub/GitLab/Bitbucket) ou suba manualmente os arquivos.
3. **Framework Preset:** Vite
4. **Build Command:** `pnpm build` (ou `npm run build`/`yarn build`)
5. **Output Directory:** `dist`
6. Deploy!

## 📦 Scripts
- `dev`: inicia o dev server
- `build`: gera `dist` para produção
- `preview`: pré-visualiza o build
- `test`: roda os testes (Vitest + RTL)
