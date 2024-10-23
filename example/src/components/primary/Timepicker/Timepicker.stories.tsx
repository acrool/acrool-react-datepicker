import type {Meta, StoryObj} from '@storybook/react';

import {Timepicker, ITimepickerProps} from '@acrool/react-datepicker';
import React from 'react';
import {fn} from '@storybook/test';
import {useArgs} from '@storybook/preview-api';
import {Flex} from '@acrool/react-grid';
import dayjs from 'dayjs';

const meta = {
    title: 'Primary/Timepicker',
    component: Timepicker,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Time picker component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onChange: fn(),
        value: '10:12:00',
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: string}>();
        const onChange = (value: string) => updateArgs({value});

        return <Timepicker
            {...args}
            value={value}
            onChange={fn(onChange)}
        />;
    },
} satisfies Meta<typeof Timepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {};
