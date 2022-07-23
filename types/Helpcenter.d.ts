// /api/helpcenter/tutorial/:tutorial_id/comment.get
declare namespace Api.Helpcenter.Tutorial.TutorialId.Comment {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        tutorial_id: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        level?: number;
        tutorial_id?: number;
    }
}
// /api/helpcenter/user/admininfo.get
declare namespace Api.Helpcenter.User.Admininfo {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        reponse: Reponse;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/manager/category/:category_id.delete
declare namespace Api.Helpcenter.Manager.Category.CategoryId {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        category_id: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/manager/tutorial/:tutorial_id.delete
declare namespace Api.Helpcenter.Manager.Tutorial.TutorialId {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        /**
         * CategoryId uint64 `p:"category_id" json:"category_id"`
         */
        tutorial_id: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/manager/tutorial/:tutorial_id.get
declare namespace Api.Helpcenter.Manager.Tutorial.TutorialId.Get {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        /**
         * path 参数
         */
        tutorial_id: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/manager/tutorial/list.get
declare namespace Api.Helpcenter.Manager.Tutorial.List {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        /**
         * 条目ID
         */
        category_id: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/tutorial/:tutorial_id.get
declare namespace Api.Helpcenter.Tutorial.TutorialId {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        /**
         * path 参数
         */
        tutorial_id: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/tutorial/list.get
declare namespace Api.Helpcenter.Tutorial.List {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        /**
         * 条目ID
         */
        category_id: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/upload/:type.post
declare namespace Api.Helpcenter.Upload.Type {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        /**
         * 类型：picture、video、file
         */
        type: string;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/user/admin.post
declare namespace Api.Helpcenter.User.Admin {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        user_id: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/:bucket/helpcenter/file/:object_id.get
declare namespace Api.Helpcenter.Bucket.Helpcenter.File.ObjectId {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        /**
         * 存储桶
         */
        bucket: string;
        /**
         * 资源 CategoryId
         */
        object_id: string;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/:res_type/:object_id.get
declare namespace Api.Helpcenter.ResType.ObjectId {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        /**
         * 资源 CategoryId
         */
        object_id: string;
        /**
         * 类型：picture、video、file
         */
        res_type: string;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/category/list.get
declare namespace Api.Helpcenter.Category.List {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        class_id?: number;
        product?: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/manager/category/:category_id.put
declare namespace Api.Helpcenter.Manager.Category.CategoryId.Put {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        category_id: number;
        name: string;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/manager/category/list.get
declare namespace Api.Helpcenter.Manager.Category.List {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        class_id?: number;
        product?: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/tutorial/:tutorial_id/comment.post
declare namespace Api.Helpcenter.Tutorial.TutorialId.Comment.Post {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        level: number;
        tutorial_id: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/manager/tutorial.post
declare namespace Api.Helpcenter.Manager.Tutorial {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        category_id: number;
        tutorial: { [key: string]: any };
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/manager/tutorial/:tutorial_id.put
declare namespace Api.Helpcenter.Manager.Tutorial.TutorialId.Put {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        tutorial: { [key: string]: any };
        /**
         * CategoryId uint64 `p:"category_id" json:"category_id"`
         */
        tutorial_id: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/manager/sys/esreload.post
declare namespace Api.Helpcenter.Manager.Sys.Esreload {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        class_id: number;
        pid: number;
        product: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/manager/sys/publish.post
declare namespace Api.Helpcenter.Manager.Sys.Publish {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        class_id: number;
        pid: number;
        product: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/manager/category.post
declare namespace Api.Helpcenter.Manager.Category {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        class_id: number;
        name: string;
        pid: number;
        product: number;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/helpcenter/tutorial/search.get
declare namespace Api.Helpcenter.Tutorial.Search {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        reponse: Reponse;
    }

    export interface Params {
        class_id?: number;
        limit?: number;
        page?: number;
        product?: number;
        query?: string;
    }

    /**
     * OK
     */
    export interface Reponse {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
