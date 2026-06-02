import { env } from "$env/dynamic/public";

export default [ " ", `This website is running on version <color="red">${ env.PUBLIC_VERSION ?? "0.0.1" }</color>.`, " " ];
