import Cookies from "js-cookie";
import AdministratorServices from "./api/v1/administrator";

type OptionsProps = {
  version: "version.1" | "version.2" | "version.3";
  mode: "dev" | "prod";
};

type PathnameOptionProps = {
  level1: string;
  level2: string;
  level3: string;
};

class Services {
  /* Hostname */
  private static hostname: Record<string, string> = {
    dev: "http://localhost:3000/api",
    prod: "https://spbe-malkot.onrender.com/api",
  };
  /* Request */
  protected static endpoint: string;
  protected static Request: RequestInit;
  protected static Method: "get" | "post" | "patch" | "delete";
  protected static pathnameOptions: PathnameOptionProps;
  protected static methods = {
    get: {
      level1: "/refrensi_arsitektur/:id/induk",
      level2: "/induk_refrensi/:id/sub",
      level3: "/sub_refrensi/:id/detail",
    },
    post: {
      level1: "/induk_refrensi",
      level2: "/sub_refrensi",
      level3: "/refrensi_detail",
    },
    patch: {
      level1: "/induk_refrensi/:id",
      level2: "/sub_refrensi/:id",
      level3: "/refrensi_detail/:id",
    },
    delete: {
      level1: "/induk_refrensi/:id",
      level2: "/sub_refrensi/:id",
      level3: "/refrensi_detail/:id",
    },
  };
  /* Options */
  protected static apiVersion: Record<string, string> = {
    "version.1": "/v1",
    "version.2": "/v2",
    "version.3": "/v3",
  };
  private static options: OptionsProps = {
    version: "version.1",
    mode: "prod",
  };
  constructor() {}

  static GET<T extends typeof Services>(
    this: T,
    options: OptionsProps = { version: "version.1", mode: "prod" }
  ) {
    this.Method = "get";
    // /* pathname based on method */
    // this.pathnameOptions = this.methods["get"];
    /* define endpoint config */
    this.endpoint =
      this.hostname[options.mode] + this.apiVersion[options.version];
    /* define Request init based on method */
    this.Request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("authToken"),
      },
    };
    return this;
  }

  static POST<T extends typeof Services>(
    this: T,
    body: Record<string, string | number>,
    options: OptionsProps = { version: "version.1", mode: "prod" }
  ) {
    /* pathname based on method */
    this.pathnameOptions = this.methods["post"];
    /* define endpoint config */
    this.endpoint =
      this.hostname[options.mode] + this.apiVersion[options.version];
    /* define Request init based on method */
    this.Request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("authToken"),
      },
      body: JSON.stringify(body),
    };

    return this;
  }

  static PATCH<T extends typeof Services>(
    this: T,
    body: Record<string, string | number>
  ) {
    /* pathname based on method */
    this.pathnameOptions = this.methods["patch"];
    /* define endpoint config */
    this.endpoint =
      this.hostname[this.options["mode"]] +
      this.apiVersion[this.options["version"]];
    /* define Request init based on method */
    this.Request = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("authToken"),
      },
      body: JSON.stringify(body),
    };

    return this;
  }

  static DELETE<T extends typeof Services>(this: T) {
    /* pathname based on method */
    this.pathnameOptions = this.methods["delete"];
    /* define endpoint config */
    this.endpoint =
      this.hostname[this.options["mode"]] +
      this.apiVersion[this.options["version"]];
    /* define Request init based on method */
    this.Request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("authToken"),
      },
    };

    return this;
  }
}

export { Services, type OptionsProps };
