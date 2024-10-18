import type {Meta, StoryObj} from '@storybook/react';

import {RangeTimeDatepicker, IRangeTimeDatepickerProps} from '@acrool/react-datepicker';
import React from 'react';
import {Flex} from '@acrool/react-grid';
import {useArgs} from '@storybook/preview-api';
import {fn} from '@storybook/test';
import dayjs from 'dayjs';

const meta = {
    title: 'Primary/RangeTimeDatepicker',
    component: RangeTimeDatepicker,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Range Time + Date picker component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onChange: fn(),
        value: {
            date: dayjs().format('YYYY-MM-DD'),
            startTime: '12:00:00',
            endTime: '13:00:00',
        },
    },
} satisfies Meta<typeof RangeTimeDatepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: IRangeTimeDatepickerProps['value']}>();

        const onChange = (value: IRangeTimeDatepickerProps['value']) => updateArgs({value});

        return <Flex column className="gap-3">
            <code>Current Value: {JSON.stringify(value)}</code>
            <RangeTimeDatepicker
                {...args}
                value={value}
                onChange={fn(onChange)}
            />
        </Flex>;
    },
};
