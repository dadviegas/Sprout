declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.yaml" {
  const data: unknown;
  export default data;
}
declare module "*.yml" {
  const data: unknown;
  export default data;
}

declare module "*.css";
