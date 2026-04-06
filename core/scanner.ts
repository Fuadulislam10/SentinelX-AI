export interface ScanResult {

risk: string
findings: string[]

}

export function scanTarget(target:string): ScanResult {

const findings:string[] = []

if(target.includes("test") || target.includes("dev")){

findings.push("Possible development environment exposed")

}

findings.push("Security headers may be missing")

return {

risk:"Medium",
findings

}

}
