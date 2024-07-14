/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Stavki {
  /** ID */
  id?: number;
  /**
   * User id
   * @min -2147483648
   * @max 2147483647
   */
  user_id: number;
  /**
   * Summ
   * @min -2147483648
   * @max 2147483647
   */
  summ: number;
  /**
   * Time
   * @format date-time
   */
  time: string;
  /** Koeff */
  koeff: number;
  /**
   * Match id
   * @min -2147483648
   * @max 2147483647
   */
  match_id: number;
  /**
   * Status
   * @min -2147483648
   * @max 2147483647
   */
  Status: number;
  /** Пользователь */
  Users?: number;
}

export interface Teams {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 30
   */
  name: string;
  /**
   * Cap
   * @minLength 1
   * @maxLength 50
   */
  cap: string;
  /**
   * Country id
   * @min -2147483648
   * @max 2147483647
   */
  country_id: number;
  /**
   * Organization id
   * @min -2147483648
   * @max 2147483647
   */
  organization_id: number;
  /**
   * Award id
   * @min -2147483648
   * @max 2147483647
   */
  award_id?: number | null;
  /**
   * Count
   * @min -2147483648
   * @max 2147483647
   */
  count: number;
  /**
   * Esports id
   * @min -2147483648
   * @max 2147483647
   */
  esports_id: number;
  /**
   * Dicription
   * @minLength 1
   * @maxLength 255
   */
  dicription: string;
}

export interface Users {
  /** ID */
  id?: number;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Last login
   * @format date-time
   */
  last_login?: string | null;
  /**
   * Superuser status
   * Designates that this user has all permissions without explicitly assigning them.
   */
  is_superuser?: boolean;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /**
   * Active
   * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
   */
  is_active?: boolean;
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string;
  /**
   * The groups this user belongs to. A user will get all permissions granted to each of their groups.
   * @uniqueItems true
   */
  groups?: number[];
  /**
   * Specific permissions for this user.
   * @uniqueItems true
   */
  user_permissions?: number[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://127.0.0.1:8000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title My API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  stavki = {
    /**
     * No description
     *
     * @tags Stavki
     * @name StavkiAddCreate
     * @request POST:/Stavki/Add/
     * @secure
     */
    stavkiAddCreate: (data: Stavki, params: RequestParams = {}) =>
      this.request<Stavki, any>({
        path: `/Stavki/Add/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stavki
     * @name StavkiFindList
     * @request GET:/Stavki/find/
     * @secure
     */
    stavkiFindList: (
      query?: {
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Stavki[], any>({
        path: `/Stavki/find/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stavki
     * @name StavkiFindCreate
     * @request POST:/Stavki/find/
     * @secure
     */
    stavkiFindCreate: (data: Stavki, params: RequestParams = {}) =>
      this.request<Stavki, any>({
        path: `/Stavki/find/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  stavkiAll = {
    /**
     * No description
     *
     * @tags StavkiALL
     * @name StavkiAllList
     * @request GET:/StavkiALL/
     * @secure
     */
    stavkiAllList: (params: RequestParams = {}) =>
      this.request<Stavki[], any>({
        path: `/StavkiALL/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StavkiALL
     * @name StavkiAllCreate
     * @request POST:/StavkiALL/
     * @secure
     */
    stavkiAllCreate: (data: Stavki, params: RequestParams = {}) =>
      this.request<Stavki, any>({
        path: `/StavkiALL/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StavkiALL
     * @name StavkiAllRead
     * @request GET:/StavkiALL/{id}/
     * @secure
     */
    stavkiAllRead: (id: number, params: RequestParams = {}) =>
      this.request<Stavki, any>({
        path: `/StavkiALL/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StavkiALL
     * @name StavkiAllUpdate
     * @request PUT:/StavkiALL/{id}/
     * @secure
     */
    stavkiAllUpdate: (id: number, data: Stavki, params: RequestParams = {}) =>
      this.request<Stavki, any>({
        path: `/StavkiALL/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StavkiALL
     * @name StavkiAllPartialUpdate
     * @request PATCH:/StavkiALL/{id}/
     * @secure
     */
    stavkiAllPartialUpdate: (id: number, data: Stavki, params: RequestParams = {}) =>
      this.request<Stavki, any>({
        path: `/StavkiALL/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StavkiALL
     * @name StavkiAllDelete
     * @request DELETE:/StavkiALL/{id}/
     * @secure
     */
    stavkiAllDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/StavkiALL/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  teams = {
    /**
     * No description
     *
     * @tags Teams
     * @name TeamsList
     * @request GET:/Teams/
     * @secure
     */
    teamsList: (params: RequestParams = {}) =>
      this.request<Teams[], any>({
        path: `/Teams/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams
     * @name TeamsCreate
     * @request POST:/Teams/
     * @secure
     */
    teamsCreate: (data: Teams, params: RequestParams = {}) =>
      this.request<Teams, any>({
        path: `/Teams/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams
     * @name TeamsRead
     * @request GET:/Teams/{id}/
     * @secure
     */
    teamsRead: (id: string, params: RequestParams = {}) =>
      this.request<Teams, any>({
        path: `/Teams/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams
     * @name TeamsUpdate
     * @request PUT:/Teams/{id}/
     * @secure
     */
    teamsUpdate: (id: string, data: Teams, params: RequestParams = {}) =>
      this.request<Teams, any>({
        path: `/Teams/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams
     * @name TeamsPartialUpdate
     * @request PATCH:/Teams/{id}/
     * @secure
     */
    teamsPartialUpdate: (id: string, data: Teams, params: RequestParams = {}) =>
      this.request<Teams, any>({
        path: `/Teams/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams
     * @name TeamsDelete
     * @request DELETE:/Teams/{id}/
     * @secure
     */
    teamsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/Teams/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams
     * @name TeamsPoisk
     * @request GET:/Teams/{id}/Poisk/
     * @secure
     */
    teamsPoisk: (id: string, params: RequestParams = {}) =>
      this.request<Teams, any>({
        path: `/Teams/${id}/Poisk/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  addUser = {
    /**
     * No description
     *
     * @tags add_user
     * @name AddUserCreate
     * @request POST:/add_user
     * @secure
     */
    addUserCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/add_user`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  find = {
    /**
     * @description API endpoint, который позволяет просматривать и редактировать акции компаний
     *
     * @tags find
     * @name FindList
     * @request GET:/find/
     * @secure
     */
    findList: (
      query?: {
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Teams[], any>({
        path: `/find/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description API endpoint, который позволяет просматривать и редактировать акции компаний
     *
     * @tags find
     * @name FindCreate
     * @request POST:/find/
     * @secure
     */
    findCreate: (data: Teams, params: RequestParams = {}) =>
      this.request<Teams, any>({
        path: `/find/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  getUser = {
    /**
     * No description
     *
     * @tags get_user
     * @name GetUserCreate
     * @request POST:/get_user/
     * @secure
     */
    getUserCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/get_user/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/login/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutCreate
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserList
     * @request GET:/user/
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<Users[], any>({
        path: `/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserCreate
     * @request POST:/user/
     * @secure
     */
    userCreate: (data: Users, params: RequestParams = {}) =>
      this.request<Users, any>({
        path: `/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRead
     * @request GET:/user/{id}/
     * @secure
     */
    userRead: (id: number, params: RequestParams = {}) =>
      this.request<Users, any>({
        path: `/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/{id}/
     * @secure
     */
    userUpdate: (id: number, data: Users, params: RequestParams = {}) =>
      this.request<Users, any>({
        path: `/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserPartialUpdate
     * @request PATCH:/user/{id}/
     * @secure
     */
    userPartialUpdate: (id: number, data: Users, params: RequestParams = {}) =>
      this.request<Users, any>({
        path: `/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserDelete
     * @request DELETE:/user/{id}/
     * @secure
     */
    userDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
