export {};
declare global {
  export namespace api {
    export interface ApiResponse {
      success: boolean;
      message: string;
      status: true | false;
      data?: unknown;
      errors?: unknown;
    }

    export interface ApiResults {
      status: true | false;
      meta?: ApiResponseMeta;
      data: unknown;
    }

    interface MetaLink {
      active: boolean;
      label: string;
      url?: string;
    }

    export interface ApiResponseMeta {
      current_page: number;
      from: number;
      last_page: number;
      links: Array<MetaLink[]>;
      path: string;
      total: number;
      per_page: number;
      to: number;
      total: number;
    }
  }
}
