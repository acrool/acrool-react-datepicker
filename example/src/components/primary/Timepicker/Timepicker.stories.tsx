import type {Meta, StoryObj} from '@storybook/react';

import {Timepicker} from '@acrool/react-datepicker';
import React from 'react';

const meta = {
    title: 'Primary/Timepicker',
    component: Timepicker,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Timepicker component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof Timepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
    },
};
