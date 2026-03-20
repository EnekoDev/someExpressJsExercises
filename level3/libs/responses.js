export const response = {
    success: (res, data) => { res.status(200).json({ data: data }) },
    failed: (res, err) => { res.status(400).json({ error: "The request has failed: " + err }) },
    badReq: (res, field) => { res.status(400).json({ error: `The ${field} is required` }) },
    notFound: (res) => { res.status(404).json({ error: "The element does not exist" }) },
    serverError: (res, err) => { res.status(500).json({ error: "Server error: " + err }) },
}