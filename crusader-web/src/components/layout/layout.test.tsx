import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Layout, { Props } from '.';

const arrangeTest = (props?: Partial<Props>) => {
  render(
    <BrowserRouter>
      <Layout
        title={props?.title || 'Page Title'}
        isLoading={props?.isLoading}
        actionComponent={props?.actionComponent}
      >
        {props?.children || <div>Some Content</div>}
      </Layout>
    </BrowserRouter>
  );
};

describe('Layout', () => {
  it('displays the title and sets the document title', async () => {
    arrangeTest();

    await waitFor(() => expect(document.title).toEqual('Page Title | Crusader'));
    expect(screen.getByTestId('title')).toHaveTextContent('Page Title');
  });

  it('displays a loading spinner when isLoading=true', async () => {
    arrangeTest({ isLoading: true });

    await waitFor(() => expect(document.title).toEqual('Loading | Crusader'));
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('content')).toBe(null);
  });

  it('renders children when isLoading=false', () => {
    arrangeTest({ children: <div data-testid="content">Page Content</div> });

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('displays an action component when passed', () => {
    arrangeTest({ actionComponent: <button data-testid="action">action</button> });

    expect(screen.getByTestId('action')).toBeInTheDocument();
  });
});
