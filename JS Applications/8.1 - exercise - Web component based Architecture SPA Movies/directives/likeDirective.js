import { directive } from 'https://esm.run/lit-html@1';

export const likeDirective = directive(() => (part) => { part.setValue('Like') });