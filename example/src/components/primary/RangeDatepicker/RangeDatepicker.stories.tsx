import type {Meta, StoryObj} from '@storybook/react';

import {RangeDatepicker, IRangeDatepickerProps} from '@acrool/react-datepicker';
import React from 'react';
import {Flex} from '@acrool/react-grid';
import {useArgs} from '@storybook/preview-api';
import {fn} from '@storybook/test';
import dayjs from 'dayjs';

const meta = {
    title: 'Primary/RangeDatepicker',
    component: RangeDatepicker,
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
            startDate: dayjs().format('YYYY-MM-DD'),
            endDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
        },
    },
} satisfies Meta<typeof RangeDatepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: IRangeDatepickerProps['value']}>();

        const onChange = (value: IRangeDatepickerProps['value']) => updateArgs({value});

        return <Flex column className="gap-3">
            <code>Current Value: {JSON.stringify(value)}</code>
            <RangeDatepicker
                {...args}
                value={value}
                onChange={fn(onChange)}
            />
        </Flex>;
    },
};
