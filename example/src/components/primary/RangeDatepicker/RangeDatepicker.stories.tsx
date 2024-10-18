import type {Meta, StoryObj} from '@storybook/react';

import {RangeDatepicker} from '@acrool/react-datepicker';
import React from 'react';

const meta = {
    title: 'Primary/RangeDatepicker',
    component: RangeDatepicker,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'RangeDatepicker component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof RangeDatepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
    },
};
