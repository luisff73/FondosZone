import type { Meta, StoryObj } from '@storybook/react';

import { ComponentFilm } from './ComponentFilm';

const meta = {
  component: ComponentFilm,
} satisfies Meta<typeof ComponentFilm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pelicula: {},
    onEliminar: () => {},
    onUpdate: () => {}
  }
};