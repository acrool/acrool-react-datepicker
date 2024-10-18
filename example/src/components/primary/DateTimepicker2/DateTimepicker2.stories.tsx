import type {Meta, StoryObj} from '@storybook/react';

import {DateTimepicker2} from '@acrool/react-datepicker';
import React from 'react';

const meta = {
    title: 'Primary/DateTimepicker2',
    component: DateTimepicker2,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Date + time Picker 2 component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof DateTimepicker2>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
    },
};
