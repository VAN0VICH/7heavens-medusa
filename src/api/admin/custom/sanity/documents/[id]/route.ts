import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import type SanityModuleService from "src/modules/sanity/service";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
	const { id } = (req as any).params;

	const sanityModule: SanityModuleService = req.scope.resolve("sanity");
	const [sanityDocument] = await sanityModule.list({ id: [id] }, {});

	const url = await sanityModule.getStudioLink(
		sanityDocument._type,
		sanityDocument._id,
		{ explicit_type: true },
	);

	res.json({ sanity_document: sanityDocument, studio_url: url });
};
