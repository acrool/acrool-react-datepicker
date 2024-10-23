import type {Meta, StoryObj} from '@storybook/react';

import {WeekDatepicker} from '@acrool/react-datepicker';
import React from 'react';
import {fn} from '@storybook/test';
import {useArgs} from '@storybook/preview-api';
import {generatorArray} from '@acrool/js-utils/array';
import dayjs from 'dayjs';

const today = dayjs();
const tagDate = generatorArray(8)
    .map((row, idx) => {
        return today.add(idx * 2, 'day').format('YYYY-MM-DD');
    });


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
        onChangeYearMonthPanel: fn(),
        value: today.add(1, 'day').format('YYYY-MM-DD'),
        locale: 'zh-TW',
        startWeekDate: today.subtract(3, 'day').format('YYYY-MM-DD'),
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: string}>();
        const onChange = (value: string) => updateArgs({value});

        return <WeekDatepicker
            {...args}
            value={value}
            onChange={fn(onChange)}
        />;
    },
} satisfies Meta<typeof WeekDatepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {};
export const WithTags: Story = {
    args: {
        tagDate,
    },
};

