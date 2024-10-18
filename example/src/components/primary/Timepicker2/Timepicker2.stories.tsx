import type {Meta, StoryObj} from '@storybook/react';

import {Timepicker2} from '@acrool/react-datepicker';
import React from 'react';

const meta = {
    title: 'Primary/Timepicker2',
    component: Timepicker2,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Timepicker2 component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof Timepicker2>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
    },
};
