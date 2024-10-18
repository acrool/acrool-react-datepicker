import type {Meta, StoryObj} from '@storybook/react';

import {DateTimepicker2} from '@acrool/react-datepicker';
import React from 'react';
import {fn} from '@storybook/test';
import {useArgs} from '@storybook/preview-api';
import {Flex} from '@acrool/react-grid';
import dayjs from 'dayjs';

const meta = {
    title: 'Primary/DateTimepicker2',
    component: DateTimepicker2,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Date + Time picker component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onChange: fn(),
        value: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
} satisfies Meta<typeof DateTimepicker2>;

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
            <DateTimepicker2
                {...args}
                value={value}
                onChange={fn(onChange)}
            />
        </Flex>;
    },
};
