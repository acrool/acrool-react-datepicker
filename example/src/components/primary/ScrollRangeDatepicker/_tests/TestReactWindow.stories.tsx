import type {Meta, StoryObj} from '@storybook/react';

import TestReactWindow from './TestReactWindow';
import React from 'react';



const meta = {
    title: 'Tests/TestReactWindow',
    component: TestReactWindow,
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
    },
    render: function Render(args) {

        return <TestReactWindow
            {...args}
        />;
    },
} satisfies Meta<typeof TestReactWindow>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {};
// export const WithTags: Story = {
//     args: {
//         tagDate,
//     },
// };

