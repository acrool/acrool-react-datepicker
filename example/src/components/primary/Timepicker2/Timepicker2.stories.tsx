import type {Meta, StoryObj} from '@storybook/react';

import {Timepicker2, ITimepicker2Props} from '@acrool/react-datepicker';
import React from 'react';
import {fn} from '@storybook/test';
import {useArgs} from '@storybook/preview-api';
import {Flex} from '@acrool/react-grid';

const meta = {
    title: 'Primary/Timepicker2',
    component: Timepicker2,
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

        return <Timepicker2
            {...args}
            value={value}
            onChange={fn(onChange)}
        />;
    },
} satisfies Meta<typeof Timepicker2>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {};
