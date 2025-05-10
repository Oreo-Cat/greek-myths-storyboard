import React from 'react';
import MythBoard from './components/MythBoard';
import { myths } from './data/myths';
import { links } from './data/links';

export default function App() {
  return <MythBoard myths={myths} links={links} />;
}
