import type {Meta, StoryObj} from '@storybook/react';

import {Datepicker} from '@acrool/react-datepicker';
import React from 'react';

const meta = {
    title: 'Primary/Datepicker',
    component: Datepicker,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Datepicker component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
    },
};
