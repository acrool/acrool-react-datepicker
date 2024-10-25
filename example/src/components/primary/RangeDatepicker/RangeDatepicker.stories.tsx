import type {Meta, StoryObj} from '@storybook/react';

import {RangeDatepicker, IRangeDatepickerProps} from '@acrool/react-datepicker';
import React from 'react';
import {useArgs} from '@storybook/preview-api';
import {fn} from '@storybook/test';
import dayjs from 'dayjs';
import {generatorArray} from '@acrool/js-utils/array';


const today = dayjs();
const tagDate = generatorArray(8)
    .map((row, idx) => {
        return today.subtract(idx + 2, 'day').format('YYYY-MM-DD');
    });


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
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: IRangeDatepickerProps['value']}>();
        const onChange = (value: IRangeDatepickerProps['value']) => updateArgs({value});

        return <RangeDatepicker
            {...args}
            value={value}
            onChange={fn(onChange)}
        />;
    },
} satisfies Meta<typeof RangeDatepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {};
export const WithTags: Story = {
    args: {
        tagDate,
    },
};

