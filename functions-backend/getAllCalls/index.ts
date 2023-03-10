import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getContainer } from "../scripts/databaseConfig";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Get all calls function processed a request.");

  const userId = req.query.userId || (req.body && req.body.userId);

  try {
    const callsContainer = await getContainer("calls", ["/userId"]);
    const querySpec = {
      query: "select * from calls c where c.userId=@userId",
      parameters: [
        {
          name: "@userId",
          value: userId,
        },
      ],
    };
    const { resources } = await callsContainer.items.query(querySpec).fetchAll();
    context.log(`Read item:`, resources);

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: resources,
    };
  } catch (err) {
    context.res = {
      status: 400 /* Defaults to 200 */,
      body: err,
    };
  }
};

export default httpTrigger;
