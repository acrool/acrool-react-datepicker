import type {Meta, StoryObj} from '@storybook/react';

import {DateTimepicker} from '@acrool/react-datepicker';
import React from 'react';

const meta = {
    title: 'Primary/DateTimepicker',
    component: DateTimepicker,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Date + time Picker component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof DateTimepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
    },
};
