export type Raydiance = {
    "version": "0.1.0",
    "name": "raydiance",
    "instructions": [
      {
        "name": "createPool",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collateralVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all lp collateral are stored"
            ]
          },
          {
            "name": "borrowableBaseVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all base mint are stored"
            ]
          },
          {
            "name": "borrowableQuoteVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all quote mint are stored"
            ]
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "lpMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "this is a liquidity pool token minted by the dex",
              "we need to do some check here, i don't know"
            ]
          },
          {
            "name": "borrowableBaseMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "Base mint, for a SOL/USDC pool this is SOL"
            ]
          },
          {
            "name": "borrowableQuoteMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "Quote mint, for a SOL/USDC pool this is USDC"
            ]
          },
          {
            "name": "baseRadianceMint",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "quoteRadianceMint",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "The Serum program, this is the program that owns the market"
            ]
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "CreatePoolInput"
            }
          }
        ]
      },
      {
        "name": "depositCollateral",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collateralVault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userCollecteralConfig",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "This is an account to store the configuration for the user",
              "collateral in the pool",
              "NOTE: because of init_if_needed, constraint for user is checked in handler func"
            ]
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "lpMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "userLpTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "DepositCollateralInput"
            }
          }
        ]
      },
      {
        "name": "withdrawCollateral",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collateralVault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userCollecteralConfig",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "This is an account to store the configuration",
              "for the user collateral in the pool"
            ]
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "lpMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "userLpTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "WithdrawCollateralInput"
            }
          }
        ]
      },
      {
        "name": "borrow",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userCollecteralConfig",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "This is an account to store the configuration",
              "for the user collateral in the pool"
            ]
          },
          {
            "name": "borrowableVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all borrowable of type input mint_type are stored"
            ]
          },
          {
            "name": "borrowableMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "this is the base/quote mint depending on the input.mint_type"
            ]
          },
          {
            "name": "userBorrowableTokenAccount",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "token account of user where we send token they borrows"
            ]
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "BorrowInput"
            }
          }
        ]
      },
      {
        "name": "repayLoan",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userCollecteralConfig",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "This is an account to store the configuration",
              "for the user collateral in the pool"
            ]
          },
          {
            "name": "borrowableVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all borrowable of type input mint_type are stored"
            ]
          },
          {
            "name": "borrowableMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "this is the base/quote mint depending on the input.mint_type"
            ]
          },
          {
            "name": "userBorrowableTokenAccount",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "token account of user where we send token they borrows"
            ]
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "RepayLoanInput"
            }
          }
        ]
      },
      {
        "name": "supplyBorrowable",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "borrowableVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "program Vault where all borrowable of type input.mint_type are stored"
            ]
          },
          {
            "name": "borrowableMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "this is the base/quote mint depending on the input.mint_type"
            ]
          },
          {
            "name": "userBorrowableTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "radianceMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userRadianceTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "SupplyBorrowableInput"
            }
          }
        ]
      },
      {
        "name": "withdrawBorrowable",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "borrowableVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all borrowable of type input mint_type are stored"
            ]
          },
          {
            "name": "borrowableMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "this is the base/quote mint depending on the input.mint_type"
            ]
          },
          {
            "name": "userBorrowableTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "radianceMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userRadianceTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "WithdrawBorrowableInput"
            }
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "lendingPool",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "baseInterestRate",
              "docs": [
                "Interest rates are automatically determined by the program"
              ],
              "type": "u64"
            },
            {
              "name": "quoteInterestRate",
              "type": "u64"
            },
            {
              "name": "collateralVault",
              "type": "publicKey"
            },
            {
              "name": "safetyMargin",
              "type": "u64"
            },
            {
              "name": "liquidationIncentive",
              "type": "u64"
            },
            {
              "name": "borrowableBaseMint",
              "type": "publicKey"
            },
            {
              "name": "borrowableQuoteMint",
              "type": "publicKey"
            },
            {
              "name": "baseRadianceMint",
              "type": "publicKey"
            },
            {
              "name": "quoteRadianceMint",
              "type": "publicKey"
            },
            {
              "name": "lpMint",
              "type": "publicKey"
            }
          ]
        }
      },
      {
        "name": "userCollateralConfig",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "user",
              "type": "publicKey"
            },
            {
              "name": "collateralDeposited",
              "docs": [
                "amout of collateral the user has deposited",
                "in the vailt"
              ],
              "type": "u64"
            },
            {
              "name": "baseBorrowedAmount",
              "type": "u64"
            },
            {
              "name": "quoteBorrowedAmount",
              "type": "u64"
            },
            {
              "name": "collateralNeeded",
              "type": "u64"
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "BorrowInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "mintType",
              "type": {
                "defined": "BorrowableType"
              }
            }
          ]
        }
      },
      {
        "name": "DepositCollateralInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "docs": [
                "TODO: take this out"
              ],
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "RepayLoanInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "mintType",
              "type": {
                "defined": "BorrowableType"
              }
            }
          ]
        }
      },
      {
        "name": "WithdrawCollateralInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "docs": [
                "TODO: take this out"
              ],
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "CreatePoolInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "docs": [
                "TODO: take this out"
              ],
              "type": "u64"
            },
            {
              "name": "safetyMargin",
              "type": "u64"
            },
            {
              "name": "liquidationIncentive",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "SupplyBorrowableInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "mintType",
              "type": {
                "defined": "BorrowableType"
              }
            }
          ]
        }
      },
      {
        "name": "WithdrawBorrowableInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "mintType",
              "type": {
                "defined": "BorrowableType"
              }
            }
          ]
        }
      },
      {
        "name": "BorrowableType",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "Base"
            },
            {
              "name": "Quote"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "InvalidTokenBalance",
        "msg": "Not enough token balance"
      },
      {
        "code": 6001,
        "name": "MathError",
        "msg": "Math Error"
      },
      {
        "code": 6002,
        "name": "InvalidPublicKey",
        "msg": "PublicKey Do not match"
      },
      {
        "code": 6003,
        "name": "IlliquidPool",
        "msg": "Not enough liquidity in the pool"
      }
    ]
  };
  
  export const IDL: Raydiance = {
    "version": "0.1.0",
    "name": "raydiance",
    "instructions": [
      {
        "name": "createPool",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collateralVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all lp collateral are stored"
            ]
          },
          {
            "name": "borrowableBaseVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all base mint are stored"
            ]
          },
          {
            "name": "borrowableQuoteVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all quote mint are stored"
            ]
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "lpMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "this is a liquidity pool token minted by the dex",
              "we need to do some check here, i don't know"
            ]
          },
          {
            "name": "borrowableBaseMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "Base mint, for a SOL/USDC pool this is SOL"
            ]
          },
          {
            "name": "borrowableQuoteMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "Quote mint, for a SOL/USDC pool this is USDC"
            ]
          },
          {
            "name": "baseRadianceMint",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "quoteRadianceMint",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "The Serum program, this is the program that owns the market"
            ]
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "CreatePoolInput"
            }
          }
        ]
      },
      {
        "name": "depositCollateral",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collateralVault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userCollecteralConfig",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "This is an account to store the configuration for the user",
              "collateral in the pool",
              "NOTE: because of init_if_needed, constraint for user is checked in handler func"
            ]
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "lpMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "userLpTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "DepositCollateralInput"
            }
          }
        ]
      },
      {
        "name": "withdrawCollateral",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "collateralVault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userCollecteralConfig",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "This is an account to store the configuration",
              "for the user collateral in the pool"
            ]
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "lpMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "userLpTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "WithdrawCollateralInput"
            }
          }
        ]
      },
      {
        "name": "borrow",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userCollecteralConfig",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "This is an account to store the configuration",
              "for the user collateral in the pool"
            ]
          },
          {
            "name": "borrowableVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all borrowable of type input mint_type are stored"
            ]
          },
          {
            "name": "borrowableMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "this is the base/quote mint depending on the input.mint_type"
            ]
          },
          {
            "name": "userBorrowableTokenAccount",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "token account of user where we send token they borrows"
            ]
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "BorrowInput"
            }
          }
        ]
      },
      {
        "name": "repayLoan",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userCollecteralConfig",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "This is an account to store the configuration",
              "for the user collateral in the pool"
            ]
          },
          {
            "name": "borrowableVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all borrowable of type input mint_type are stored"
            ]
          },
          {
            "name": "borrowableMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "this is the base/quote mint depending on the input.mint_type"
            ]
          },
          {
            "name": "userBorrowableTokenAccount",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "token account of user where we send token they borrows"
            ]
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "RepayLoanInput"
            }
          }
        ]
      },
      {
        "name": "supplyBorrowable",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "borrowableVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "program Vault where all borrowable of type input.mint_type are stored"
            ]
          },
          {
            "name": "borrowableMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "this is the base/quote mint depending on the input.mint_type"
            ]
          },
          {
            "name": "userBorrowableTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "radianceMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userRadianceTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "SupplyBorrowableInput"
            }
          }
        ]
      },
      {
        "name": "withdrawBorrowable",
        "accounts": [
          {
            "name": "lendingPool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "borrowableVault",
            "isMut": true,
            "isSigner": false,
            "docs": [
              "Vault where all borrowable of type input mint_type are stored"
            ]
          },
          {
            "name": "borrowableMint",
            "isMut": false,
            "isSigner": false,
            "docs": [
              "this is the base/quote mint depending on the input.mint_type"
            ]
          },
          {
            "name": "userBorrowableTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "radianceMint",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userRadianceTokenAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "serumMarket",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "input",
            "type": {
              "defined": "WithdrawBorrowableInput"
            }
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "lendingPool",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "baseInterestRate",
              "docs": [
                "Interest rates are automatically determined by the program"
              ],
              "type": "u64"
            },
            {
              "name": "quoteInterestRate",
              "type": "u64"
            },
            {
              "name": "collateralVault",
              "type": "publicKey"
            },
            {
              "name": "safetyMargin",
              "type": "u64"
            },
            {
              "name": "liquidationIncentive",
              "type": "u64"
            },
            {
              "name": "borrowableBaseMint",
              "type": "publicKey"
            },
            {
              "name": "borrowableQuoteMint",
              "type": "publicKey"
            },
            {
              "name": "baseRadianceMint",
              "type": "publicKey"
            },
            {
              "name": "quoteRadianceMint",
              "type": "publicKey"
            },
            {
              "name": "lpMint",
              "type": "publicKey"
            }
          ]
        }
      },
      {
        "name": "userCollateralConfig",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "user",
              "type": "publicKey"
            },
            {
              "name": "collateralDeposited",
              "docs": [
                "amout of collateral the user has deposited",
                "in the vailt"
              ],
              "type": "u64"
            },
            {
              "name": "baseBorrowedAmount",
              "type": "u64"
            },
            {
              "name": "quoteBorrowedAmount",
              "type": "u64"
            },
            {
              "name": "collateralNeeded",
              "type": "u64"
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "BorrowInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "mintType",
              "type": {
                "defined": "BorrowableType"
              }
            }
          ]
        }
      },
      {
        "name": "DepositCollateralInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "docs": [
                "TODO: take this out"
              ],
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "RepayLoanInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "mintType",
              "type": {
                "defined": "BorrowableType"
              }
            }
          ]
        }
      },
      {
        "name": "WithdrawCollateralInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "docs": [
                "TODO: take this out"
              ],
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "CreatePoolInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "docs": [
                "TODO: take this out"
              ],
              "type": "u64"
            },
            {
              "name": "safetyMargin",
              "type": "u64"
            },
            {
              "name": "liquidationIncentive",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "SupplyBorrowableInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "mintType",
              "type": {
                "defined": "BorrowableType"
              }
            }
          ]
        }
      },
      {
        "name": "WithdrawBorrowableInput",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolId",
              "type": "u64"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "mintType",
              "type": {
                "defined": "BorrowableType"
              }
            }
          ]
        }
      },
      {
        "name": "BorrowableType",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "Base"
            },
            {
              "name": "Quote"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "InvalidTokenBalance",
        "msg": "Not enough token balance"
      },
      {
        "code": 6001,
        "name": "MathError",
        "msg": "Math Error"
      },
      {
        "code": 6002,
        "name": "InvalidPublicKey",
        "msg": "PublicKey Do not match"
      },
      {
        "code": 6003,
        "name": "IlliquidPool",
        "msg": "Not enough liquidity in the pool"
      }
    ]
  };
  