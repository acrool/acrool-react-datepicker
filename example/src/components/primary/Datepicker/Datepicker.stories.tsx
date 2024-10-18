import type {Meta, StoryObj} from '@storybook/react';

import {Datepicker} from '@acrool/react-datepicker';
import React from 'react';
import {fn} from '@storybook/test';
import {useArgs} from '@storybook/preview-api';
import {Flex} from '@acrool/react-grid';
import dayjs from 'dayjs';

const meta = {
    title: 'Primary/Datepicker',
    component: Datepicker,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Date picker component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onChange: fn(),
        value: dayjs().format('YYYY-MM-DD'),
    },
} satisfies Meta<typeof Datepicker>;

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
            <Datepicker
                {...args}
                value={value}
                onChange={fn(onChange)}
            />
        </Flex>;
    },
};
