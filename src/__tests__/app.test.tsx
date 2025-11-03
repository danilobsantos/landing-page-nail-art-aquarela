import { render, screen } from "@testing-library/react";
import App, { getStaticTextSnippets, __expected, getImageCandidates, __aquarelaSelectors } from "../App";

test("mostra o preço correto no CTA", () => {
  render(<App />);
  expect(screen.getByText(__expected.ctaPrice)).toBeInTheDocument();
});

test("renderiza a seção de vídeo com título acessível", () => {
  render(<App />);
  const iframe = screen.getByTitle(getStaticTextSnippets().videoTitle);
  expect(iframe).toBeInTheDocument();
});

test("há um link de inscrição com classe de efeito aquarela", () => {
  render(<App />);
  const links = screen.getAllByRole("link");
  const hasAquarela = links.some(el => (el.getAttribute("class") || "").includes("btn-aquarela"));
  expect(hasAquarela).toBe(true);
});

test("candidatos de imagem contêm 4 alternativas", () => {
  const list = getImageCandidates();
  expect(list).toHaveLength(4);
});

test("camada aquarela e blobs existem no DOM", () => {
  render(<App />);
  expect(document.querySelector(__aquarelaSelectors.layer)).toBeTruthy();
  for (const sel of __aquarelaSelectors.blobs) {
    expect(document.querySelector(sel)).toBeTruthy();
  }
});
