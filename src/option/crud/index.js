import {baseUrl} from "@/config/env";

export default () => {
    return {
        translate: false,
        searchLabelWidth: 100,
        excelBtn: true,
        labelWidth: 110,
        selection: true,
        tip: false,
        index: true,
        align: 'center',
        headerAlign: 'center',
        border: true,
        stripe: true,
        pageNumber: 'current',//页码
        pageSize: 'size',//页数
        res:(data)=>{
            return {
                total:0,
                data:[]
            }
        },//列表的结构
        total: 'total',//总页数
        data: 'list',//列表属性
        column: [
            {
                label: "id",
                prop: "id",
                hide:true,
                display:false,


            },

            {
                label: "姓名",
                prop: "name",
                search: true,
            }, {
                label: "性别",
                prop: "sex",
                type: 'select',
                dicData: [{
                    label: '男',
                    value: 0
                }, {
                    label: '女',
                    value: 1
                }],
                search: true,
            }, {
                label: "禁止日期",
                prop: "date",
                type: "date"
            }, {
                label: '级别',
                prop: 'grade',
                type: 'select',
                // dicData: [{
                //     label: '测试',
                //     value: 1
                // },
                //     {
                //         label: '测试2',
                //         value: 2
                //     }],

                dictUrl: "http://localhost:10033/sys/link/dict/list"
            }
        ],
    }
}
