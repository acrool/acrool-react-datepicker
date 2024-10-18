import type {Meta, StoryObj} from '@storybook/react';

import {RangeTimeDatepicker} from '@acrool/react-datepicker';
import React from 'react';

const meta = {
    title: 'Primary/RangeTimeDatepicker',
    component: RangeTimeDatepicker,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Range Time + Date picker component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof RangeTimeDatepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
    },
};
