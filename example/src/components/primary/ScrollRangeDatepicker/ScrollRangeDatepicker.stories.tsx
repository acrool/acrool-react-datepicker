import type {Meta, StoryObj} from '@storybook/react';

import {ScrollRangeDatepicker, IScrollDatepickerProps} from '@acrool/react-datepicker';
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
    title: 'Primary/ScrollRangeDatepicker',
    component: ScrollRangeDatepicker,
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
        const [{value}, updateArgs] = useArgs<{value: IScrollDatepickerProps['value']}>();
        const onChange = (value: IScrollDatepickerProps['value']) => updateArgs({value});

        return <ScrollRangeDatepicker
            {...args}
            value={value}
            onChange={fn(onChange)}
        />;
    },
} satisfies Meta<typeof ScrollRangeDatepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {};
export const WithTags: Story = {
    args: {
        tagDate,
    },
};

