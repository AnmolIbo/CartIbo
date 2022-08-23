
const cart_line={
    type: "object",
    properties: {
        quantity:{
            type: "object",
            properties: {
            quantity_number:{
                type:"integer",
            }
            }
        },
        item:{
            type: "object",
            properties: {
                offer_id:{
                    type:"string"
                }
            }
        },
        unit_price:{
            type: "object",
            properties:{
                cent_amount:{
                    type:"integer"
                },
                currency:{
                    type:"string",
                    enum:["INR"]
                },
                fraction:{
                    type:"integer"
                },
                
            },required:["cent_amount","currency","fraction"]
        
        }
    },
    required: ["quantity","item","unit_price"]
}
const cartSchema = {
   
    body:{
        user_id: { type: "string" },
        cart_lines: { type: "array", items: cart_line },
    },
    response:{
        201:{
            type:"object",
            properties: {
                cart_id:{
                    type:"string"
                },
                order_number:{
                    type:"string"
                },
                user_id:{
                    type:"string"
                },
                cart_lines:{
                    type:"array",
                    items:cart_line
                }
            }
        }
    },    
};
const get_cart_detail = {
    params: {
      type: "object",
      properties: {
        cart_id: {
          type: "string",
          format: "uuid",
        },
      },
      required: ["cart_id"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          cart_id: { type: "string" },
          order_number: { type: "string" },
          total_quantity: { type: "integer" },
          total_items: { type: "integer" },
          cart_lines: { type: "array", items: cart_line },
          totals: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string" },
                price: {
                  type: "object",
                  properties: {
                    cent_amount: { type: "integer" },
                    currency: { type: "string" },
                    fraction: { type: "integer" },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  const add_cart_line = {
    params: {
      type: "object",
      properties: {
        cart_id: {
          type: "string",
          format: "uuid",
        },
      },
      required: ["cart_id"],
    },
    body: cart_line,
    response: {
      201: {
        type: "object",
        properties: {
          status: { type: "string" },
        },
      },
    },
  };
  const update_cart_line = {
    params: {
      type: "object",
      properties: {
        cart_id: {
          type: "string",
          format: "uuid",
        },
        cart_line_id: {
          type: "string",
          format: "uuid",
        },
      },
      required: ["cart_id", "cart_line_id"],
    },
    body: {
      type: "object",
      properties: {
        quantity: {
          type: "object",
          properties: {
            quantity_number: {
              type: "integer",
              minimum: 1,
            },
          },
          required: ["quantity_number"],
        },
      },
      required: ["quantity"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          status: { type: "string" },
        },
      },
    },
  };
module.exports ={cart_line,cartSchema,get_cart_detail,update_cart_line,add_cart_line}