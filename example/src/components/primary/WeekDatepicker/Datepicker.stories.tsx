import type {Meta, StoryObj} from '@storybook/react';

import {WeekDatepicker} from '@acrool/react-datepicker';
import React from 'react';
import {fn} from '@storybook/test';
import {useArgs} from '@storybook/preview-api';
import {Flex} from '@acrool/react-grid';
import dayjs from 'dayjs';

const meta = {
    title: 'Primary/WeekDatepicker',
    component: WeekDatepicker,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Week Date picker component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onChange: fn(),
        value: dayjs().format('YYYY-MM-DD'),
    },
} satisfies Meta<typeof WeekDatepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: string}>();

        const onChange = (value: string) => updateArgs({value});

        return <Flex column className="gap-3">
            <div>Current Value: {value}</div>
            <WeekDatepicker
                {...args}
                value={value}
                onChange={fn(onChange)}
            />
        </Flex>;
    },
};
