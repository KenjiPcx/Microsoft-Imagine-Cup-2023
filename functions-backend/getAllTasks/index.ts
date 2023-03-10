import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getContainer } from "../scripts/databaseConfig";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Get all tasks function processed a request.");

  const userId = req.query.userId || (req.body && req.body.userId);

  try {
    const tasksContainer = await getContainer("tasks", ["/userId"]);
    const querySpec = {
      query: "select * from tasks t where t.userId=@userId",
      parameters: [
        {
          name: "@userId",
          value: userId,
        },
      ],
    };
    const { resources } = await tasksContainer.items
      .query(querySpec)
      .fetchAll();
    context.log(`Read item:`, resources);

    const tasks = resources.map((r) => r.tasks).flat();

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: tasks,
    };
  } catch (err) {
    context.res = {
      status: 400 /* Defaults to 200 */,
      body: err,
    };
  }
};

export default httpTrigger;
