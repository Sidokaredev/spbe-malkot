import { type OptionsProps, Services } from "../../../services";

class AdministratorServices extends Services {
  private static selectedApiPath: Record<string, string>;
  protected static apiPath = {
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
  constructor() {
    super();
  }

  public static init(options: OptionsProps) {
    // this.options = options;
  }

  static async ReferensiArsitektur() {}

  static Level1(id?: number) {
    /* set path options based on Method */
    this.selectedApiPath = this.apiPath[this.Method];
    /* guard -> throw when the apiPath have required :id but argument id unfilled */
    if (
      this.selectedApiPath["level1"].indexOf(":id") !== -1 &&
      id === undefined
    )
      throw new Error("Parameter id should be filled with an argument");
    /* set full endpoint and replace :id with value */
    this.endpoint =
      this.endpoint + this.selectedApiPath["level1"].replace(":id", String(id));

    console.info("endpoint: " + this.endpoint);

    return this;
  }

  static async Level2(id?: number) {
    if (
      this.pathnameOptions["level2"].indexOf(":id") !== -1 &&
      id === undefined
    )
      throw new Error("Parameter id should be filled with an argument");

    this.endpoint =
      this.endpoint + this.pathnameOptions["level2"].replace(":id", String(id));

    return this;
  }

  static async Level3(id?: number) {
    if (
      this.pathnameOptions["level3"].indexOf(":id") !== -1 &&
      id === undefined
    )
      throw new Error("Parameter id should be filled with an argument");

    this.endpoint =
      this.endpoint + this.pathnameOptions["level3"].replace(":id", String(id));

    return this;
  }

  static async do() {
    try {
      const req = await fetch(this.endpoint, this.Request);
      const res = await req.json();
      return {
        ok: req.ok,
        status: req.status,
        json: res,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: true,
          message: error.message,
          detail: `${error.name} Error, due to ${error.message}. happened at ${error.stack}`,
        };
      }
    }
  }
}

export default AdministratorServices;
