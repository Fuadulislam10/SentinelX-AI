import { scanTarget } from "../core/scanner"

const target = process.argv[2]

if(!target){

console.log("Usage: npm run scan example.com")

process.exit()

}

const result = scanTarget(target)

console.log("\nSentinelX-AI CLI Result\n")

console.log("Risk:", result.risk)

console.log("\nFindings:")

result.findings.forEach(f=>console.log("-",f))
