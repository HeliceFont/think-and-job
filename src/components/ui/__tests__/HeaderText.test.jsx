import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeaderText from '../HeaderText.jsx';

describe('HeaderText Component', () => {
  it('renders the first text by default', () => {
    const testTexts = ["Hello World", "Another Text"];
    render(<HeaderText texts={testTexts} />);
    
    // Check for the sr-only text
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
