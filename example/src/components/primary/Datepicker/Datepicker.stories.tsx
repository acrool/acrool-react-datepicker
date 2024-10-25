import type {Meta, StoryObj} from '@storybook/react';

import {Datepicker, IDatepickerProps} from '@acrool/react-datepicker';
import React, {FC} from 'react';
import {fn} from '@storybook/test';
import {useArgs} from '@storybook/preview-api';
import dayjs from 'dayjs';
import {generatorArray} from '@acrool/js-utils/array';

const today = dayjs();
const tagDate = generatorArray(8)
    .map((row, idx) => {
        return today.subtract(idx + 2, 'day').format('YYYY-MM-DD');
    });

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
        value: today.format('YYYY-MM-DD'),
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs<{value: string}>();
        const onChange = (value: string) => updateArgs({value});

        return <Datepicker
            {...args}
            value={value}
            onChange={fn(onChange)}
        />;
    },
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {};
export const WithTags: Story = {
    args: {
        tagDate,
    },
};
